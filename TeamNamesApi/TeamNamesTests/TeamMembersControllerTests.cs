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

            var deleteMemberId = 2;

            _mockmembersService
                .Setup(ms => ms.DeleteMember(deleteMemberId));

            // ACT

            IActionResult deleteResult = _sut.Delete(2);

            // ASSERT  

            _mockmembersService.Verify(ms => ms.DeleteMember(deleteMemberId));

            Assert.IsInstanceOf<NoContentResult>(deleteResult);

        }

        [Test]
        public void Patch_ValidIDProvided_VerifyPatchCalled()
        {
            // ARRANGE

            var jsonPatch = new JsonPatchDocument<TeamMember>();

            var updateMemberId = 1;

            _mockmembersService
                .Setup(ms => ms.PartialUpdateMember(updateMemberId, jsonPatch));

            // ACT

            _sut.Patch(updateMemberId, jsonPatch);

            // ASSERT  

            _mockmembersService.Verify(ms => ms.PartialUpdateMember(updateMemberId, jsonPatch));

        }
       //[Test]
        //public void Post_StringInput_VerifyPostCalled()
        //{
        //    // ARRANGE

        //    var newDarcie = new TeamMember { Name = "Darcie", Id = 1 };

        //    _mockmembersService
        //        .Setup(ms => ms.CreateMember(newDarcie));

        //    // ACT

        //    _sut.PostAsync(newDarcie);

        //    // ASSERT  

        //    _mockmembersService.Verify(ms => ms. CreateMember(newDarcie));
        //}
    }
}

