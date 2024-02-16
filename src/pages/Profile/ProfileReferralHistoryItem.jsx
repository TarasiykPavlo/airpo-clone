function ProfileReferalsHistoryItem({ value, RefId }) {
  return (
    <tr>
      <td>
        <span style={{ marginLeft: "10px" }}>{RefId}</span>
      </td>
      <td>
        <span style={{ marginLeft: "10px" }}>
          {+value < 0
            ? `Withdrawal: `
            : +value == 0
            ? `You have registered`
            : `Income: +`}
          {+value == 0 ? null : value}
        </span>
      </td>
    </tr>
  );
}
export default ProfileReferalsHistoryItem;
