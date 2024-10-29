using boatifyApi.Services;
using Microsoft.AspNetCore.Mvc;

namespace boatifyApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {

        private readonly IWeatherForecastService _service;
        private readonly ILogger<WeatherForecastController> _logger;

        public WeatherForecastController(ILogger<WeatherForecastController> logger, IWeatherForecastService service)
        {
            _logger = logger;
            _service = service;
        }

        [HttpGet]
        public IEnumerable<WeatherForecast> Get2()
        {
            var result = _service.Get();
            return result;
        }

        [HttpGet("current/{num}")]
        public IEnumerable<WeatherForecast> Get([FromRoute] int num, [FromQuery]int minTemp, [FromBody]string  maxTemp) 
        {
            var test = num + minTemp + Int32.Parse(maxTemp);
            var result = _service.Get();
            return result;
        }

        [HttpPost]
        [Route("generate")]
        public ActionResult<string> Hello([FromBody]string name)
        {
            HttpContext.Response.StatusCode = 401;
            return "Hello " + name;
        }
    }
}
