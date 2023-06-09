import { useState } from 'react'
import { Footer } from '../Footer/Footer'
import { Search } from '../Search/Search'
import { Siderbar } from '../Siderbar/Sidebar'
import { Modals } from '../Utils/Modals/Modals'
import { dataInscription, filter, testInscriptions } from '../../import/staticData'
import { AiOutlineEye } from 'react-icons/ai'
import { HiOutlinePencil } from 'react-icons/hi'
import { Button } from '../Utils/Button/Button'

const Bitacoras = () => {
  const [mostrarModal, setMostrarModal] = useState(false)
  const [filteredData, setFilteredData] = useState([])

  const handleIconClick = () => {
    setMostrarModal(!mostrarModal)
  }

  const handleModal = () => {
    setMostrarModal(!mostrarModal)
  }
  const filterBitacoras = filter.filterBitacoras

  const filterEstado = (estado) => {
    const filtered = testInscriptions.data.filter((x) => {
      return estado ? x.estado === estado : true
    })

    setFilteredData(filtered)
  }

  return (
    <>
      {mostrarModal && <Modals bodyFilter view={filterBitacoras} title={'Bitacoras'} closeModal={handleModal} />}
      <main className="flex min-h-screen flex-row">
        <Siderbar />
        <section className="relative grid w-min flex-auto grid-rows-3-10-75-15">
          <header className="grid place-items-center">
            <Search filter iconClick={handleIconClick} />
          </header>
          <div>
            <section className="mx-auto w-11/12">
              <div className="mx-auto flex w-fit gap-5">
                <Button bg="bg-secondary/10" value={'BITÁCORAS CALIFICADAS'} textColor="text-black" font="font-normal" px="px-2" rounded="rounded-t-lg" textSize="text-sm" clickeame={() => filterEstado('Calificado')} />
                <Button bg="bg-secondary/10" value={'BITÁCORAS SIN CALIFICAR'} textColor="text-black" font="font-normal" px="px-2" rounded="rounded-t-lg" textSize="text-sm" clickeame={() => filterEstado('Sin Calificar')} />
              </div>
              <table className="w-full table-auto">
                <thead>
                  <tr className="bg-gray-200 text-gray-600 text-sm leading-normal">
                    <th className="whitespace-nowrap py-3 text-center">Nombres y Apellidos</th>
                    <th className="whitespace-nowrap py-3 text-center">Programa de Formación</th>
                    <th className="py-3 text-center">Ficha</th>
                    <th className="py-3 text-center">Estado</th>
                    <th className="py-3 text-center">Fechas</th>
                    <th className="py-3 text-center">Detalles</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                  {filteredData.length > 0
                    ? filteredData.map((x, i) => (
                        <tr className="border-gray-200 border-b" key={i}>
                          <td className="px-3 text-center">
                            <span className="break-words font-medium">{x.nombreCompleto}</span>
                          </td>
                          <td className="px-3 text-center">
                            <span className="break-words">{x.programaFormacion}</span>
                          </td>
                          <td className="px-6 py-3 text-center">
                            <div className="flex items-center justify-center">
                              <span>{x.ficha}</span>
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-6 py-3 text-center">
                            <span className={`rounded-full px-3 py-1 text-xs ${x.estado === 'Sin Calificar' ? 'bg-red-200 text-red-600' : 'bg-green-200 text-green-600'}`}>{x.estado}</span>
                          </td>
                          <td className="px-6 py-3 text-center">
                            <div className="flex items-center justify-center">
                              <span>{x.fecha}</span>
                            </div>
                          </td>
                          <td className="px-6 py-3 text-center">
                            <div className="item-center flex justify-center">
                              <div className="mr-2 w-4 transform cursor-pointer hover:scale-125 hover:text-purple-500">
                                <AiOutlineEye />
                              </div>
                              <div className="mr-2 w-4 transform cursor-pointer hover:scale-125 hover:text-purple-500">
                                <HiOutlinePencil />
                              </div>
                            </div>
                          </td>
                        </tr>
                      ))
                    : testInscriptions.data.map((x, i) => (
                        <tr className="border-gray-200 border-b" key={i}>
                          <td className="px-3 text-center">
                            <span className="break-words font-medium">{x.nombreCompleto}</span>
                          </td>
                          <td className="px-3 text-center">
                            <span className="break-words">{x.programaFormacion}</span>
                          </td>
                          <td className="px-6 py-3 text-center">
                            <div className="flex items-center justify-center">
                              <span>{x.ficha}</span>
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-6 py-3 text-center">
                            <span className={`rounded-full px-3 py-1 text-xs ${x.estado === 'Sin Calificar' ? 'bg-red-200 text-red-600' : 'bg-green-200 text-green-600'}`}>{x.estado}</span>
                          </td>
                          <td className="px-6 py-3 text-center">
                            <div className="flex items-center justify-center">
                              <span>{x.fecha}</span>
                            </div>
                          </td>
                          <td className="px-6 py-3 text-center">
                            <div className="item-center flex justify-center">
                              <div className="mr-2 w-4 transform cursor-pointer hover:scale-125 hover:text-purple-500">
                                <AiOutlineEye />
                              </div>
                              <div className="mr-2 w-4 transform cursor-pointer hover:scale-125 hover:text-purple-500">
                                <HiOutlinePencil />
                              </div>
                            </div>
                          </td>
                        </tr>
                      ))}
                </tbody>
              </table>
            </section>
          </div>
          <Footer />
        </section>
      </main>
    </>
  )
}

export { Bitacoras }
