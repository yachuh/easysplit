import { useState } from 'react'
import { useFormContext, Controller } from 'react-hook-form'
import { InsertPhoto } from '@mui/icons-material'

export default function AttachPhotos () {
  const {
    control,
    register
  } = useFormContext

  return (
        <Controller
            control={control}
            name=""
            render={({ field }) => (
                <div className="flex items-center gap-3 my-6">
                    <label htmlFor="fileUpload" className="w-16 h-16 p-4 inline-block box-border bg-gray-300 rounded-md hover:drop-shadow-[0px_2px_4px_rgba(0,0,0,0.25)] hover:cursor-pointer">
                        <InsertPhoto className="w-6 h-6 text-white" />
                    </label>
                    <input
                        id="fileUpload"
                        type="file"
                        className="hidden"
                    />
                </div>
            )}
        />
  )
}
