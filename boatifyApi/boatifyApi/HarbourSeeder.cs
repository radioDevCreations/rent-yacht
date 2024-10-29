using boatifyApi.Entities;

namespace boatifyApi
{
    public class HarbourSeeder
    {
        private readonly BoatifyDbContext _dbContext
        public HarbourSeeder(BoatifyDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        public void Seed()
        {
            if (_dbContext.Database.CanConnect())
            {
                if (!_dbContext.Harbours.Any())
                {
                    var harbours = GetHarbours();
                    _dbContext.Harbours.AddRange(harbours);
                }
            }
        }

        private IEnumerable<Harbour> GetHarbours()
        {
            var harbours = new List<Harbour>()
            {
                new Harbour() {},
                new Harbour() {}
            }
        }
    }
}
