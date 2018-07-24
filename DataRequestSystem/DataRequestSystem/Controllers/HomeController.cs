using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace DataRequestSystem.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult RequestSubmission()
        {
            return View();
        }

        public ActionResult CompletedRequests()
        {
            ViewBag.Message = "";

            return View();
        }

        public ActionResult RequestQueue()
        {
            ViewBag.Message = "";

            return View();
        }
    }
}