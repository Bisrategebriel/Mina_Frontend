import React, { useState } from "react";

function NoticePopup(props) {
    const [visible, setVisible] = useState(true)
	return (
		<div className={visible ? "fixed bottom-0 z-50 w-screen p-4 bg-yellow-300 flex flex-col items-center" : "hidden" } >
			<p>
				This is the testing phase of Minaplay. The points you collect during the
				testing phase will not be transferred when it is launched.
				<br />
				ይህ የሚናፕሌይ ሙከራ ድህረገፅ ነው። ይህንን የሙከራ ድህረገፅ በመጠቀም የምትሰበስቡት ነጥብ በጊዜያዊነት ለሙከራ ብቻ
				ይሆናል የሚጠቅመው።
			</p>

			<button className="bg-white p-2 rounded-md w-fit" onClick={() => {
                setVisible(false)
            }}>
				I understand
			</button>
		</div>
	);
}

export default NoticePopup;
