import axios from 'axios';
import { useForm } from "react-hook-form";

export const UserProfile = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            Name: '',
            Account: '',
        }
    });

    const getUserProfile = () => {

        axios
            .get(`https://easysplit.rocket-coding.com/api/User/GetProfile`)
            .then(res => {
                console.log(res);
                console.log("成功");
            })
            .catch(err => {
                console.log(err);
            });

    }

    console.log(getUserProfile());

    const onSubmit = data => {
        console.log(data);

        const {
            Name,
            Account,
        } = data;

        // axios
        //     .get(`https://easysplit.rocket-coding.com/api/User/GetProfile`)
        //     .then(res => {
        //         console.log(res);
        //         console.log("成功");
        //     })
        //     .catch(err => {
        //         console.log(err);
        //     });
    }

    return (
        <div>
            <h2 className="text-2xl mb-3">會員資料</h2>
            <form
                className="flex flex-col w-1/3"
                onSubmit={handleSubmit(onSubmit)}>
                <label
                    htmlFor="Name">
                    Name
                </label>
                <input
                    className="mb-3 border border-slate-700 rounded-sm"
                    type="text"
                    placeholder="Name"
                    {...register("Name", {
                        required: {
                            value: true,
                            message: '請輸入您的姓名!'
                        }
                    })} />
                <p
                    className="text-xs mb-2 text-rose-600">
                    {errors.Name?.message}
                </p>
                <label
                    htmlFor="Account">
                    Email
                </label>
                <input
                    disabled="disabled"
                    className="mb-3 border border-slate-700 rounded-sm"
                    type="email"
                // value={Account}
                />
                <input
                    className="p-2 border border-slate-700 rounded-sm w-1/3"
                    value="儲存"
                    type="submit" />
            </form>
        </div>
    );
}