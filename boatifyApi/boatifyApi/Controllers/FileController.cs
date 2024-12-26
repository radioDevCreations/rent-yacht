using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.StaticFiles;

namespace boatifyApi.Controllers
{
    /*[Route("file")]
    public class FileController : ControllerBase
    {
        public ActionResult GetFile([FromQuery] string fileName)
        {

            var rootPath = Directory.GetCurrentDirectory();
            var filePath = $"{rootPath}/PrivateFiles/{fileName}";
            var fileExists = System.IO.File.Exists(filePath);
            if (!fileExists)
            {
                return NotFound();
            }
            var contentProvider = new FileExtensionContentTypeProvider();
            contentProvider.TryGetContentType(fileName, out string contentType);

            var fileContent = System.IO.File.ReadAllBytes(filePath);
            return File(fileContent, contentType, fileName);
        }
    }*/
}
