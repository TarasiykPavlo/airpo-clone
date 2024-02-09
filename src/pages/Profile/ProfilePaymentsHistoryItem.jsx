function ProfilePaymentsHistoryItem({ value, date }) {
  return (
    <li>
      <span>{+value<0?`Withdrawal: `:+value==0?`You have registered`:`Income: +`} {+value==0?null:value}</span>
      <div className="history-date">{date}</div>
    </li>
  );
}
export default ProfilePaymentsHistoryItem;
