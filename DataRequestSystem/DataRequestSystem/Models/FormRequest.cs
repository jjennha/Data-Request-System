using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;

namespace DataRequestSystem.Models
{
    public class FormRequest
    {
     
        public int Id { get; set; }

        // Request
        [Required]
        public DateTime DateRequested { get; set; }

        [Required]
        public DateTime DateWanted { get; set; }

        [Required]
        public string RequesterName { get; set; }

        [Required]
        public string PriorityLevel { get; set; }

        [Required]
        public int NumberRequests { get; set; }

        [Required]
        public string Requests { get; set; }

        [Required]
        public string UsageExplanation { get; set; }

        public string RequestComments { get; set; }

        public string Viewers { get; set; }

        public int NumberViewers { get; set; }

        [Required]
        public string Format { get; set; }

        // For Devs
        public DateTime DatePulled { get; set; }

        public DateTime DatePulledBy { get; set; }

        public string DevComments { get; set; }

        public string FilesAttached { get; set; }

        public string CompletionStatus { get; set; }

        public string UncompletionReason { get; set; }

        // Completed Requests only
        public string SQLQueries { get; set; }

        public string Ticket { get; set; }
    }
}