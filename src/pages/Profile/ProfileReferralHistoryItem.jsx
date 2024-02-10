function ProfilePaymentsHistoryItem({ value, RefId }) {
  return (
  <tr>
    <td><span>{RefId}</span></td>
    <td><span>{+value<0?`Withdrawal: `:+value==0?`You have registered`:`Income: +`} {+value==0?null:value}</span></td>
  </tr>
  );
}
export default ProfilePaymentsHistoryItem;
