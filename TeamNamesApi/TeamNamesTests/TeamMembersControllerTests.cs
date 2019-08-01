using System;
using System.Collections.Generic;
using Moq;
using NUnit.Framework;
using TeamNames.Controllers;
using TeamNames.Services;
using TeamNames.Models;
using System.Linq;
using Microsoft.AspNetCore.Mvc;

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
    }
}

