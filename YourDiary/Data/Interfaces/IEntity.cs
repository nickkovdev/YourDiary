namespace YourDiary.Data.Interfaces
{
    public interface IEntity<TKey>
    {
        string Id { get; set; }
    }
}
