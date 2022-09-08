import iconGroup from '../image/iconGroup.svg'
import iconExport from '../image/iconExport.svg'
import iconImg from '../image/iconImg.svg'
import iconNotice from '../image/iconNotice.svg'

export default function Feature () {
  return (
        <div
            className="bg-colors-secondary py-20 mb-20 overflow-hidden">
            <h2
                className="font-bold text-white text-center mb-24"
                data-aos="fade-up">
                EasySplit 特色
            </h2>
            <ul
                className="viewContainer md:flex flex-wrap justify-center gap-x-5 gap-y-20">
                <li
                    className="feature-Card relative card-shadow"
                    data-aos="zoom-in-right">
                    <img
                        className="absolute feature-Card-Img"
                        src={iconGroup}
                        alt="iconGroup"
                    />
                    <h4
                        className="feature-Card-Title">
                        每個人都可以加入
                    </h4>
                    <p>可以無需註冊帳號即可使用分帳群組，並開始新增、編輯..等紀錄相關的費用。</p>
                </li>
                <li
                    className="feature-Card relative card-shadow"
                    data-aos="zoom-in-left">
                    <img
                        className="absolute feature-Card-Img"
                        src={iconImg}
                        alt="iconImg" />
                    <h4 className="feature-Card-Title">
                        添加圖像紀錄
                    </h4>
                    <p>將發票、收據、明細...等相關的紀錄使用拍照保存置費用中。</p>
                </li>
                <li
                    className="feature-Card relative card-shadow"
                    data-aos="zoom-in-right">
                    <img
                        className="absolute feature-Card-Img"
                        src={iconNotice}
                        alt="iconNotice"
                    />
                    <h4 className="feature-Card-Title">
                        系統通知紀錄
                    </h4>
                    <p>當您的朋友新增、編輯、刪除或者共享費用時，均可收到即時性的通知。</p>
                </li>
                <li
                    className="feature-Card relative card-shadow"
                    data-aos="zoom-in-left">
                    <img
                        className="absolute feature-Card-Img"
                        src={iconExport}
                        alt="iconExport"
                    />
                    <h4 className="feature-Card-Title">
                        匯出帳目資料
                    </h4>
                    <p>可使用CSV匯出帳目資料，寄至您的電子郵件信箱。</p>
                </li>
            </ul>
        </div>
  )
}
