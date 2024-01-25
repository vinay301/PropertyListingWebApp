using Microsoft.AspNetCore.Mvc;

namespace propertyListingAPI.Controllers
{
    public class CityController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
