import { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import { ToastContainer, toast } from 'react-toastify'
import { AiOutlineUser } from 'react-icons/ai'
import * as XLSX from 'xlsx'

import { Button } from '../button/button'
import { Siderbar } from '../Siderbar/Sidebar'

const RegisterStudent = () => {
  const excelFileRef = useRef(null)

  const handleExcelFile = () => {
    const currentFile = excelFileRef.current.files[0]

    const checkFile = excelFileRef.current.files[0].name.split('.')
    if (checkFile[1] !== 'xlsx' && checkFile[1] !== 'xls') {
      Swal.fire({
        icon: 'error',
        title: '¡Error!',
        text: 'Has ingresado un formato inválido. ¡Por favor escoga un formato válido de excel!',
        footer: '.xlsx, .xls'
      })
      excelFileRef.current.value = ''
      return
    }
    readExcelFile(currentFile)
  }

  const readExcelFile = async (file) => {
    if (!file) return
    const reader = new FileReader()

    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result)
      const workbook = XLSX.read(data, { type: 'array' })

      console.log(workbook)

      workbook.SheetNames.forEach((sheetName) => {
        const worksheet = workbook.Sheets[sheetName]
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 })

        console.log(`Sheet: ${sheetName}`)
        console.log(jsonData)

        if (jsonData.length > 2) {
          const showModal = async () => {
            const responseModal = await Swal.fire({
              icon: 'question',
              title: '¡Aviso!',
              text: 'Se ha detectado más de 2 registros en el archivo excel. ¿Desea directamente guardar todos los registros?',
              confirmButtonText: 'Guardar registros',
              confirmButtonColor: '#39A900',
              denyButtonText: 'No guardar registros',
              showDenyButton: true
            })
            if (responseModal.isConfirmed) {
              Swal.fire({
                icon: 'success',
                title: '¡Éxito!',
                text: 'Se han guardado todos los registros exitosamente'
              })
            } else if (responseModal.isDenied) {
              //* terminar
            }
          }
          showModal()
        }
      })
    }

    reader.readAsArrayBuffer(file)
  }

  const dataInscription = [
    { icon: <AiOutlineUser />, type: 'text', name: 'name', placeholder: 'Alejandro', label: 'Nombres' },
    { icon: <AiOutlineUser />, type: 'text', name: 'lastname', placeholder: 'Rodriguez', label: 'Apellidos' },
    { icon: <AiOutlineUser />, type: 'select', name: 'typeid', placeholder: 'sin seleccionar', label: 'Tipo documento' },
    { icon: <AiOutlineUser />, type: 'number', name: 'numberid', placeholder: '1023456789', label: 'Número documento' },
    { icon: <AiOutlineUser />, type: 'email', name: 'email', placeholder: 'example@sena.edu.co', label: 'Correo electrónico' },
    { icon: <AiOutlineUser />, type: 'number', name: 'phone', placeholder: '3012345467', label: 'Número de celular' },
    { icon: <AiOutlineUser />, type: 'number', name: 'formationnumber', placeholder: '2134567', label: 'Número de ficha' },
    { icon: <AiOutlineUser />, type: 'text', name: 'program', placeholder: 'ADSO', label: 'Programa de formación' },
    { icon: <AiOutlineUser />, type: 'select', name: 'modality', placeholder: 'Sin seleccionar', label: 'Modalidad' },
    { icon: <AiOutlineUser />, type: 'date', name: 'datestart', label: 'Fecha de inicio prácticas' },
    { icon: <AiOutlineUser />, type: 'date', name: 'dateend', label: 'Fecha de fin prácticas' }
  ]
  const idTypes = [
    { value: 'cc', name: 'Cédula de ciudadanía' },
    { value: 'ce', name: 'Cédula de extranjería' },
    { value: 'ti', name: 'Tarjeta de identidad' }
  ]

  const modalities = [
    { value: 'contrato', name: 'Contrato de aprendizaje' },
    { value: 'pasantia', name: 'Pasantías' },
    { value: 'proyecto', name: 'Proyecto formativo' }
  ]

  /* const [modalities, setModalities] = useState([{}])
  useEffect(() => {
    const getModalities = () => {
      axios
        .get('http://localhost:3000/api/practical-stages')
        .then((response) => {
          setModalities(response.data)
        })
        .catch((error) => {
          throw new Error(error)
        })
    }
    getModa lities()
  }, [])*/

  const handleSubmit = (e) => {
    e.preventDefault()
  }
  return (
    <>
      <ToastContainer position='top-right' autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme='colored' />
      <section className='grid grid-cols-2-20r-80'>
        <Siderbar />
        <section className='grid grid-rows-2-25-75'>
          <h1 className='text-center uppercase font-bold text-3xl place-self-center'>Inscribe a un aprendiz</h1>
          <section className='h-4/5 overflow-hidden'>
            <form action='' className='grid grid-rows-2 gap-y-20' onSubmit={handleSubmit}>
              <section className='grid xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-1 w-4/5 mx-auto gap-y-4'>
                {dataInscription.map((item, i) => {
                  return (
                    <div className='text-gray-400 m-auto' key={i}>
                      <label htmlFor='nombre' className='font-semibold '>
                        {item.label}
                      </label>
                      {item.type === 'number' ? (
                        <div className='relative'>
                          <span className='absolute inset-y-0 left-0 flex items-center pl-3'>{item.icon}</span>
                          <input type={item.type} name={item.name} className='py-1.5 text-base text-black bg-white border-1 border-gray-400 rounded-md pl-10 focus:outline-none focus:bg-white focus:text-gray-900 w-72 appearance-none' style={{ WebkitAppearance: 'none', MozAppearance: 'textfield' }} autoComplete='on' placeholder={item.placeholder} />
                        </div>
                      ) : item.type === 'select' ? (
                        <div className='relative'>
                          <span className='absolute inset-y-0 left-0 flex items-center pl-3'>{item.icon}</span>
                          <select name={item.name} className='py-2 text-base text-black bg-white border-1 border-gray-400 rounded-md pl-10 focus:outline-none focus:bg-white focus:text-gray-900 w-72' defaultValue={'none'}>
                            <option value={'none'} disabled>
                              Sin seleccionar
                            </option>
                            {item.name === 'typeid'
                              ? idTypes.map((item, i) => {
                                  return (
                                    <option value={item.value} key={i}>
                                      {item.name}
                                    </option>
                                  )
                                })
                              : modalities.map((item, i) => {
                                  return (
                                    <option value={item.value} key={i}>
                                      {item.name}
                                    </option>
                                  )
                                })}
                          </select>
                        </div>
                      ) : (
                        <div className='relative'>
                          <span className='absolute inset-y-0 left-0 flex items-center pl-3'>{item.icon}</span>
                          <input type={item.type} name={item.name} className='py-1.5 text-base text-black bg-white border-1 border-gray-400 rounded-md pl-10 focus:outline-none focus:bg-white focus:text-gray-900 w-72' autoComplete='on' placeholder={item.placeholder} />
                        </div>
                      )}
                    </div>
                  )
                })}
              </section>
              <section className='flex justify-between h-10 lg:flex-row flex-col gap-y-4'>
                <Button value={'Eliminar datos'} bg='bg-red-500' px='px-[3rem]' />
                <div className='rounded-md flex py-1 w-fit mx-auto border border-gray bg-white px-3 shadow-md'>
                  <label htmlFor='upload' className='flex items-center gap-2 cursor-pointer '>
                    <svg xmlns='http://www.w3.org/2000/svg' className='h-7 w-7 fill-white stroke-indigo-500' viewBox='0 0 24 24' stroke='currentColor' strokeWidth='2'>
                      <path strokeLinecap='round' strokeLinejoin='round' d='M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' />
                    </svg>
                    <span className='text-gray-600 font-medium'>Subir archivo</span>
                  </label>
                  <input id='upload' ref={excelFileRef} accept='.xlsx, .xls' onChange={handleExcelFile} type='file' className='hidden w-fit' />
                </div>
                <Button value={'Enviar'} px='px-[4rem]' />
              </section>
            </form>
          </section>
        </section>
      </section>
    </>
  )
}

export { RegisterStudent }
