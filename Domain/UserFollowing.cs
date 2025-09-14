using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore.ChangeTracking.Internal;

namespace Domain
{// Join table "UserFollowing" connects User to User
    public class UserFollowing  
    {
        public required string ObserverId { get; set; }
        public User Observer { get; set; } = null!;  //Observer represents the user who follows another user

        public required string TargetId { get; set; }
        public User Target { get; set; } = null!;  //Target represents the user being followed
    }
}