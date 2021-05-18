using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using API_Angular.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace API_Angular.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _env;
        public EmployeeController(IConfiguration configuration,IWebHostEnvironment env)
        {
            _env = env;
            _configuration = configuration;
        }
        [HttpGet]
        public JsonResult Get()
        {
            string guery = @"select EmployeeId,EmployeeName,Departament,convert(varchar(10),DataOfJoining,120) as DataOfJoining,PhotoFileName  from dbo.Employee";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("EmployeeAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(guery, myCon))
                {

                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();


                };
            }
            return new JsonResult(table);
        }
        [HttpPost]
        public JsonResult Post(Employee emp)
        {
            string guery = @"insert into dbo.Employee(EmployeeName,DataOfJoining,Departament,PhotoFileName) values
              ('" + emp.EmployeeName + @"',
               '" + emp.DataOfJoining + @"',
               '" + emp.Departament + @"',
               '" + emp.PhotoFileName + @"'
)";
            ;
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("EmployeeAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(guery, myCon))
                {

                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();


                };
            }
            return new JsonResult("Added Deportament");
        }
        [HttpPut]
        public JsonResult Put(Employee emp)
        {
            ;
            string guery = @"update  dbo.Employee set 
            EmployeeName='" + emp.EmployeeName + @"',
             Departament='" + emp.Departament + @"',
             DataOfJoining='" + emp.DataOfJoining + @"',
             PhotoFileName='" + emp.PhotoFileName + @"'
                 where EmployeeId= '"+ emp.EmployeeId + @"'"
         
            ;
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("EmployeeAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(guery, myCon))
                {

                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();

                    ;
                };
            }
            return new JsonResult("Update Deportament");
        }
        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            string guery = @"delete from dbo.Employee 
                 where EmployeeId= '" + id + @"'"
            ;
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("EmployeeAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(guery, myCon))
                {

                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();


                };
            }
            return new JsonResult("Delete Deportament");
        }
        [Route("SaveFile")]
        [HttpPost]
        public JsonResult SaveFile()
        {
            try
            {
                var httpRequest = Request.Form;
                var postedFile = httpRequest.Files[0];
                string filename = postedFile.FileName;
                var physycalPath = _env.ContentRootPath + "/Photos/" + filename;
                using(var stream=new FileStream(physycalPath, FileMode.Create))
                {
                    postedFile.CopyTo(stream);
                }
                ;
                return new JsonResult(filename);
            }
            catch(Exception)
            {
                return new JsonResult("anonymous.png");
            }
        }
        [Route("GetAllDepartamentNames")]
        public JsonResult GetAllDepartamentNames()
        {
            string guery = @"select DepartamentName from dbo.Departament";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("EmployeeAppCon");
            SqlDataReader myReader;
            ;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(guery, myCon))
                {

                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();


                };
            }
            return new JsonResult(table);
        }
    }
}

 