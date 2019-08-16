using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using TeamNames.Models;

namespace TeamNames.Services
{
    public class MembersService : IMembersService
    {
        public async Task<TeamMember>CreateMember(TeamMember nameRequest)
        {
            using (var db = new MembersContext())
            {
                var newTeamMember = new TeamMember { Name = nameRequest.Name };
                db.TeamNames.Add(newTeamMember);

                await db.SaveChangesAsync();
                //correct number returned here for ID
                return newTeamMember;
            }
            
        }
        public IEnumerable <TeamMember> ViewAllMembers()
        {
            using (var db = new MembersContext())
            {
                return db.TeamNames.ToList();
            }

        }
        public TeamMember[] GetTeamMember(int getMemberId)
        {
            using (var db = new MembersContext())
            {
                 var teamMember = db.TeamNames
                .Where(m => m.Id == getMemberId).ToArray();
                return teamMember;
            }

        }

        public TeamMember[] GetByName (string getMemberName)
        {
            using (var db = new MembersContext())
            {
                var teamMembers = db.TeamNames
               .Where(m => m.Name.Contains(getMemberName)).ToArray();
                return teamMembers;
            }

        }

        public void DeleteMember(int deleteMemberId)
        {
            using (var db = new MembersContext())
            {
                var selectedMember = db.TeamNames
                .Where(m => m.Id == deleteMemberId).Single();
                db.TeamNames.Remove(selectedMember);
                db.SaveChanges();
            }

        }

        public void DeleteMembersBulk(int [] deleteBulkMemberIds)
        {
            using (var db = new MembersContext())
            {
                var selectedBulkMembers = db.TeamNames
                .Where(m => deleteBulkMemberIds.Contains(m.Id)).ToList();
                db.TeamNames.RemoveRange(selectedBulkMembers);
                db.SaveChanges();
            }

        }
        public void AmendMember(int amendMemberID, string nameUpdate)
        {
            using (var db = new MembersContext())
            {
                var selectedMember = db.TeamNames
                .Where(m => m.Id == amendMemberID).Single();
                db.TeamNames.Update(selectedMember);
                db.SaveChanges();
            }
        }

        public void PartialUpdateMember(int id, JsonPatchDocument<TeamMember> patch)
        {
            using (var db = new MembersContext())
            {
                var selectedMember = db.TeamNames
                .Where(m => m.Id == id).Single();
                patch.ApplyTo(selectedMember);
                db.SaveChanges();
            }
        }
    }
}
