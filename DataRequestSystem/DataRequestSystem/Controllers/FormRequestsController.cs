using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using DataRequestSystem.Models;

namespace DataRequestSystem.Controllers
{
    public class FormRequestsController : ApiController
    {
        private DataRequestSystemContext db = new DataRequestSystemContext();

        // GET: api/FormRequests
        public IQueryable<FormRequest> GetFormRequests()
        {
            return db.FormRequests;
        }

        // GET: api/FormRequests/5
        [ResponseType(typeof(FormRequest))]
        public async Task<IHttpActionResult> GetFormRequest(int id)
        {
            FormRequest formRequest = await db.FormRequests.FindAsync(id);
            if (formRequest == null)
            {
                return NotFound();
            }

            return Ok(formRequest);
        }

        // PUT: api/FormRequests/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutFormRequest(int id, FormRequest formRequest)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != formRequest.Id)
            {
                return BadRequest();
            }

            db.Entry(formRequest).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FormRequestExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/FormRequests
        [ResponseType(typeof(FormRequest))]
        public async Task<IHttpActionResult> PostFormRequest(FormRequest formRequest)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.FormRequests.Add(formRequest);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = formRequest.Id }, formRequest);
        }

        // DELETE: api/FormRequests/5
        [ResponseType(typeof(FormRequest))]
        public async Task<IHttpActionResult> DeleteFormRequest(int id)
        {
            FormRequest formRequest = await db.FormRequests.FindAsync(id);
            if (formRequest == null)
            {
                return NotFound();
            }

            db.FormRequests.Remove(formRequest);
            await db.SaveChangesAsync();

            return Ok(formRequest);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool FormRequestExists(int id)
        {
            return db.FormRequests.Count(e => e.Id == id) > 0;
        }
    }
}