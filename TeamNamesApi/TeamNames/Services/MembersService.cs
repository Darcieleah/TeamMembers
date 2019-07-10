using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using TeamNames.Models;

namespace TeamNames.Services
{
    public class MembersService
    {
        public void CreateMember(MemberNameRequest nameRequest)
        {
            using (var db = new MembersContext())
            {
                db.TeamNames.Add(new MemberNameRequest { Name = nameRequest.Name});
                var saveAdd = db.SaveChanges();
            }
        }
        public IEnumerable <MemberNameRequest> ViewAllMembers()
        {
            using (var db = new MembersContext())
            {
                return db.TeamNames.ToList();
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
    }
}
