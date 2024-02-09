function ProfilePaymentsHistoryItem({ value, date }) {
  return (
    <li>
      <span>{+value<0?`Withdrawal: `:+value==0?`Registration: `:`Income: +`} {value}</span>
      <div className="history-date">{date}</div>
    </li>
  );
}
export default ProfilePaymentsHistoryItem;
