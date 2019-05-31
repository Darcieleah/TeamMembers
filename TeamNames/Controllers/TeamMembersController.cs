using Microsoft.AspNetCore.Mvc;

namespace TeamNames.Controllers
{
    //handles incoming HTTP requests and sends a response back to user

    public class Person
    {
        public int Age { get; set; }
        public string Name { get; set; }
    }

    public class Darcie : Person
    {
        public string FavouriteColour { get; set; }
    }

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