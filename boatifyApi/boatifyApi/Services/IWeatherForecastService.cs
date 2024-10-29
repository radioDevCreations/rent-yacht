
namespace boatifyApi.Services
{
    public interface IWeatherForecastService
    {
        IEnumerable<WeatherForecast> Get();
    }
}