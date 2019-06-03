using Microsoft.AspNetCore.Mvc;
using TeamNames.Models;

namespace TeamNames.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //handles incoming HTTP requests and sends a response back to user

    public class TeamMembersController : ControllerBase
    {
        //POST
        
        [HttpPost]
        public void Post([FromBody] MemberNameRequest nameRequest)
        {
            var n = 0;

            //take ID and Name entered
            //add new MemberName 
        }
    }

}