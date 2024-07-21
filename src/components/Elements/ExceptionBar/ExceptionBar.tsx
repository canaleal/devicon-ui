import { IException } from "../../../types"
import './styles/exceptionBar.css'

interface IExceptionProps {
    exceptions: IException[];
    extraClasses?: string;
}

export const ExceptionBar = ({ exceptions, extraClasses }: IExceptionProps) => {
 if (exceptions.length === 0) return null
  return (
    <div className={`exception-container ${extraClasses}`}>
        {exceptions.map((exception) => (
            <div key={exception.name} className='exception-container__element'>
                <i className='fa-solid fa-exclamation-triangle'></i>
                <span>{exception.message}</span>
            </div>
        ))}
    </div>
  )
}
