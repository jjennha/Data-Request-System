namespace DataRequestSystem.Migrations
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;
    using Models;

    internal sealed class Configuration : DbMigrationsConfiguration<DataRequestSystem.Models.DataRequestSystemContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(DataRequestSystem.Models.DataRequestSystemContext context)
        {
            context.FormRequests.AddOrUpdate(o => o.Id,
                    new FormRequest
                    {
                        DateRequested = new DateTime(2018, 4, 5),
                        DateWanted = new DateTime(2018, 4, 5),
                        RequesterName = "Cofdy",
                        PriorityLevel = "Immediately",
                        NumberRequests = 8,
                        Requests = "fire me",
                        UsageExplanation = "pls",
                        RequestComments = "?",
                        Viewers = "Justin",
                        Format = "csv",
                        DatePulled = new DateTime(2018, 4, 5),
                        DataPulledBy = "myself",
                        DevComments = "biwbfinvsfjs",
                        FileURL = "something.com",
                        FileName = "txt.txt",
                        CompletionStatus = "not done",
                        UncompletionReason = "sorry",
                        SQLQueries = "query.com",
                        TicketURL = "ticket.org",
                        TicketNumber = 1,
                        Type = "Resignation"
                    }
            );

            context.FormRequests.AddOrUpdate(o => o.Id,
                    new FormRequest
                    {
                        DateRequested = new DateTime(2018, 4, 26),
                        DateWanted = new DateTime(2019, 5, 15),
                        RequesterName = "michael",
                        PriorityLevel = "later",
                        NumberRequests = 80,
                        Requests = "fire me",
                        UsageExplanation = "pls",
                        RequestComments = "?",
                        Viewers = "Jenny",
                        Format = "csv",
                        DatePulled = new DateTime(2018, 4, 5),
                        DataPulledBy = "myself",
                        DevComments = "ok",
                        FileURL = "somethingelse.com",
                        FileName = "bbonfgiobs.txt",
                        CompletionStatus = "not done",
                        UncompletionReason = "sorry",
                        SQLQueries = "michael.com",
                        TicketURL = "mykael.org",
                        TicketNumber = 2,
                        Type = "Challenge"
                    }
            );
        }
    }
}
