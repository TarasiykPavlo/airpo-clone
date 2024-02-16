function ProfilePaymentsHistoryItem({ value, date }) {
  return (
    <li className="application__item">
      <div className="application__item-left">
        <CloseCircleFilled className="application__stop-icon" />
        <span className="application__name">Company 1</span>
      </div>

      <div className="application__item-right">
        <ExclamationCircleFilled className="application__error-icon" />
        <PlayCircleFilled className="application__launch-icon" />
        <PauseCircleFilled className="application__pause-icon" />
        <MoreOutlined
          onClick={() => navigate("settings")}
          className="application__more-icon"
        />
      </div>
    </li>
  );
}
export default ProfilePaymentsHistoryItem;
