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

        [Required]
        public string Format { get; set; }

        public string Type { get; set; }
        public string RequestComments { get; set; }
        public string Viewers { get; set; }
        public int NumberViewers { get; set; }

        // For Devs
        public DateTime DatePulled { get; set; }
        public string DataPulledBy { get; set; }
        public string DevComments { get; set; }
        public string UncompletionReason { get; set; }
        public string CompletionStatus { get; set; }
        public int TicketNumber { get; set; }
        public string TicketURL { get; set; }
        public string SQLQueries { get; set; }

        // Completed Requests only
        public string FileName { get; set; }
        public string FileURL { get; set; }

    }
}