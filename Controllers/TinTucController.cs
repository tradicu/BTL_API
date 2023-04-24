using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace BTL_api.Controllers
{
    public class TinTucController : Controller
    {
        // GET: TinTuc
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult Detail(int id)
        {
            ViewBag.index = id;
            return View();
        }
    }
}