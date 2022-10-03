import doraImg from '../../image/Dora.svg'
import yaChuImg from '../../image/YaChu.svg'
import jeanImg from '../../image/Jean.svg'

export default function AboutUs () {
  return (
        <div className="viewContainer overflow-hidden mb-32">
            <h2
                className="font-bold text-center mb-10"
                data-aos="fade-up">
                關於我們
            </h2>
            <ul className="flex flex-col xl:flex-row gap-5 justify-between p-8">
                <li
                    className="aboutUs-Card border-colors-fifth card-shadow"
                    data-aos="zoom-in-right">
                    <img
                        src={doraImg}
                        alt="DoraImg"
                    />
                    <div className="flex flex-col gap-5 items-center">
                        <h5 className="font-bold">Dora</h5>
                        <h4 className="text-black font-bold">薛嵐璟</h4>
                        <p className="text-2xl">前端工程師</p>
                        <p>設計｜3D｜動畫</p>
                        <p>旅遊｜F1｜自然</p>
                    </div>
                </li>
                <li
                    className="aboutUs-Card border-colors-primary card-shadow"
                    data-aos="zoom-in">
                    <img
                        src={yaChuImg}
                        alt="YaChuImg"
                    />
                    <div className="flex flex-col gap-5 items-center">
                        <h5 className="font-bold">YaChu</h5>
                      <h4 className="text-black font-bold">謝雅竹</h4>
                        <p className="text-2xl">前端工程師</p>
                        <p>網球｜潛水｜旅遊</p>
                        <p>旅遊｜高爾夫｜自然</p>
                    </div>
                </li>
                <li
                    className="aboutUs-Card border-colors-fourth card-shadow"
                    data-aos="zoom-in-left">
                    <img
                        src={jeanImg}
                        alt="JeanImg"
                    />
                    <div className="flex flex-col gap-5 items-center">
                        <h5 className="font-bold">Jean</h5>
                      <h4 className="text-black font-bold">江卷靜</h4>
                        <p className="text-2xl">後端工程師</p>
                        <p>瑜珈｜貓派｜山海</p>
                        <p>插畫｜極簡｜理財</p>
                    </div>
                </li>
            </ul>
        </div>
  )
}
