using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Mvc;

namespace BTL_api.Controllers
{

    public class ThoiTietController : Controller
    {
        public ActionResult Index(string place, float lon, float lat)
        {
            ViewBag.lon = lon;
            ViewBag.lat = lat;
            ViewBag.Place = place;
            ViewBag.Act = "";

            return View();
        }

        public ActionResult TheoGio(string place, float lon, float lat)
        {
            ViewBag.lon = lon;
            ViewBag.lat = lat;
            ViewBag.Place = place;
            ViewBag.Act = "Theo Giờ";
            return View();
        }
        public ActionResult NgayMai(float lon, float lat)
        {
            ViewBag.lon = lon;
            ViewBag.lat = lat;
            ViewBag.Act = "Ngày Mai";
            return View();
        }
        public ActionResult BaNgayToi(float lon, float lat)
        {
            ViewBag.lon = lon;
            ViewBag.lat = lat;
            ViewBag.Act = "Ba Ngày Tới";
            return View();
        }
        public ActionResult NamNgayToi(string place,float lon, float lat)
        {
            ViewBag.lon = lon;
            ViewBag.lat = lat;
            ViewBag.Place = place;
            ViewBag.Act = "Năm Ngày Tới";
            return View();
        }
    }
}
