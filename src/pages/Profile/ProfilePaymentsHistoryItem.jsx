function ProfilePaymentsHistoryItem({ value, date }) {
  return (
    <li>
      <span>{+value<0?`Withdrawal: `:`Income: +`} {value}</span>
      <div className="history-date">{date}</div>
    </li>
  );
}
export default ProfilePaymentsHistoryItem;
