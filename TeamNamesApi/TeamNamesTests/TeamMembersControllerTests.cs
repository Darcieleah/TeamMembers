using System;
using System.Collections.Generic;
using Moq;
using NUnit.Framework;
using TeamNames.Controllers;
using TeamNames.Services;
using TeamNames.Models;



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
            _mockmembersService.Setup(ms => ms.ViewAllMembers()).Returns(new[] { testDarcie });

            // ACT
            _sut.Get();

            // ASSERT

        }


    }
}

