using Microsoft.AspNetCore.Mvc;

namespace TeamNames.Controllers
{
    //handles incoming HTTP requests and sends a response back to user

    public class TeamMembersController : ControllerBase
    {
        //POST
        
        [HttpPost]
        public void Post([FromBody] string value)
        {

           
            //take ID and Name entered
            //add new MemberName 
        }
    }

}