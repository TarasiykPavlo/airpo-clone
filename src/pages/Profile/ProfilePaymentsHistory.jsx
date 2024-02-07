import React, { useEffect, useState } from 'react';
import { useUser } from '../../features/authentication/useUser';
import { useAuthClient } from "../../features/authentication/useAuthClient";


function ProfilePaymentsHistory() {
    const [messageShow, messageContext] = message.useMessage();
    const { user } = useUser();
    const { picture, name } = user.user_metadata;
    const { id, aicoin } = useAuthClient(user.id);
    return ( /*
                    <li>
                      Income: + 431,46 AIC
                      <div className="history-date">02 / 12 / 24</div>
                    </li>
                    <li>
                      Withdrawal: — 300 AIC
                      <div className="history-date">07 / 12 / 24</div>
                    </li>
                    <li>
                      Income: + 760,83 AIC
                      <div className="history-date">15 / 12 / 24</div>
                    </li>
            */
           <><li>{user.id}</li><div className="history-date">02 / 12 / 24</div></>
           )
}

export default ProfilePaymentsHistory;