using System.Collections.Generic;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using TeamNames.Models;
using TeamNames.Services;

namespace TeamNames.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //handles incoming HTTP requests and sends a response back to user

    public class TeamMembersController : ControllerBase
    {
        //POST
        //api/teammembers
        [HttpPost]
        public void Post([FromBody] MemberNameRequest nameRequest)
        {
            var memberService = new MembersService();
            memberService.CreateMember(nameRequest);
        }

        //GET
        //api/teammembers
        [HttpGet]
        public IEnumerable<MemberNameRequest> Get()
        {
            var memberService = new MembersService();
            return memberService.ViewAllMembers();
        }

        //DELETE
        //api/teammembers/1
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            var memberService = new MembersService();
            memberService.DeleteMember(id);
        }

        //PATCH
        //api/teammembers/1
        [HttpPatch("{id}")]
        public void Patch(int id, [FromBody] JsonPatchDocument<MemberNameRequest> patch)
        {
            var memberService = new MembersService();
            memberService.PartialUpdateMember(id, patch);

        }


    }
}