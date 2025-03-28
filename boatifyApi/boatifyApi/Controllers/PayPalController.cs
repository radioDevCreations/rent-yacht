
using boatifyApi.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using PayPalCheckoutSdk.Core;
using PayPalCheckoutSdk.Orders;

namespace boatifyApi.Controllers
{
    [Route("api/paypal")]
    [ApiController]
    public class PayPalController : ControllerBase
    {
        private readonly PayPalConfig _config;
        private readonly IHttpClientFactory _clientFactory;

        public PayPalController(IOptions<PayPalConfig> config, IHttpClientFactory clientFactory)
        {
            _config = config.Value;
            _clientFactory = clientFactory;
        }

        private PayPalEnvironment GetPayPalEnvironment()
        {
            return _config.Environment == "live"
                ? new LiveEnvironment(_config.ClientId, _config.ClientSecret)
                : new SandboxEnvironment(_config.ClientId, _config.ClientSecret);
        }

        private PayPalHttpClient GetPayPalClient()
        {
            return new PayPalHttpClient(GetPayPalEnvironment());
        }


        [Authorize]
        [HttpPost("capture")]
        public async Task<IActionResult> CaptureOrder([FromBody] CaptureRequest request)
        {
            var client = GetPayPalClient();
            var orderRequest = new OrdersCaptureRequest(request.OrderId);
            orderRequest.RequestBody(new OrderActionRequest());

            try
            {
                var response = await client.Execute(orderRequest);
                if (response.StatusCode == System.Net.HttpStatusCode.Created)
                {
                    return Ok(new { success = true });
                }
            }
            catch (Exception ex)
            {
                return BadRequest(new { success = false, message = ex.Message });
            }

            return BadRequest(new { success = false });
        }
    }

    public class CaptureRequest
    {
        public string OrderId { get; set; }
    }
}
