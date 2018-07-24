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
            //  This method will be called after migrating to the latest version.

            //  You can use the DbSet<T>.AddOrUpdate() helper extension method 
            //  to avoid creating duplicate seed data.

            context.FormRequests.AddOrUpdate(o => o.Id,
                    new FormRequest
                    {
                        DateRequested = new DateTime(2018, 4,5),
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
                        DatePulledBy = new DateTime(2018, 4, 5),
                        DevComments = "biwbfinvsfjs",
                        FilesAttached = "txt.txt",
                        CompletionStatus = "not done",
                        UncompletionReason = "sorry",
                        SQLQueries = "query.com",
                        Ticket = "ticket.org"
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
                        DatePulledBy = new DateTime(2018, 4, 15),
                        DevComments = "ok",
                        FilesAttached = "bbonfgiobs.txt",
                        CompletionStatus = "not done",
                        UncompletionReason = "sorry",
                        SQLQueries = "michael.com",
                        Ticket = "mykael.org"
                    }
            );



        }
    }
}
