using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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
        //public void ViewAllMembers()
        //{
        //    using (var db = new MembersContext())
        //    {
        //        foreach (var name in db.TeamNames)
        //        {
        //            //display in table
        //        }
        //    }
        //}
    }
}
