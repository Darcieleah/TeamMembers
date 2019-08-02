using System;
using System.Collections.Generic;
using Moq;
using NUnit.Framework;
using TeamNames.Controllers;
using TeamNames.Services;
using TeamNames.Models;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.JsonPatch;

namespace Tests
{
    [TestFixture]
    public class TeamMemberControllerTests
    {
        private TeamMembersController _sut;
        private Mock<IMembersService> _mockmembersService;

        [SetUp]

        public void SetUp()
        {
            _mockmembersService = new Mock<IMembersService>();
            _sut = new TeamMembersController(_mockmembersService.Object);

        }

        [Test]
        public void Get_TeamMembersController_ReturnsAll()
        {
            // ARRANGE
            //
            var testDarcie = new TeamMember { Name = "Darcie" };
            var allMembers = new[] { testDarcie };

            _mockmembersService
                .Setup(ms => ms.ViewAllMembers())
                .Returns(allMembers);

            // ACT
           
            var getResult = _sut.Get();

            // ASSERT

            Assert.AreEqual(allMembers, getResult);

        }

        [Test]
        public void Delete_ValidIDProvided_ReturnsNoContent()
        {
            // ARRANGE
            //
            var testDarcie = new TeamMember { Name = "Darcie", Id = 1 };
            var testJamie = new TeamMember { Name = "Jame", Id = 2 };

            var allMembers = new[] { testDarcie, testJamie };
            var deleteMemberId = 2;

            _mockmembersService
                .Setup(ms => ms.DeleteMember(deleteMemberId));

            // ACT

            IActionResult deleteResult =_sut.Delete(2);

            // ASSERT  

            _mockmembersService.Verify(ms => ms.DeleteMember(deleteMemberId));

            Assert.IsInstanceOf<NoContentResult>(deleteResult);

        }

        [Test]
        public void Patch_ValidIDProvided_VerifyPatchCalled()
        {
            // ARRANGE
            
            var testDarcie = new TeamMember { Name = "Darcie", Id = 1 };
            var jsonPatch = new JsonPatchDocument<TeamMember>();

            var allMembers = new[] { testDarcie };
            var updateMemberId = 1;

            _mockmembersService
                .Setup(ms => ms.PartialUpdateMember(updateMemberId, jsonPatch));

            // ACT

            _sut.Patch(updateMemberId, jsonPatch);

            // ASSERT  

            _mockmembersService.Verify(ms => ms.PartialUpdateMember(updateMemberId, jsonPatch));

        }

        //public void PartialUpdateMember(int id, JsonPatchDocument<TeamMember> patch)
        //{
        //    using (var db = new MembersContext())
        //    {
        //        var selectedMember = db.TeamNames
        //        .Where(m => m.Id == id).Single();
        //        patch.ApplyTo(selectedMember);
        //        db.SaveChanges();
        //    }
        //}
    }
}

