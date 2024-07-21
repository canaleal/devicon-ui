import { useEffect, useState } from 'react'
import { DEVICON_VERSION_RELEASE } from '../../../constants'
import { DeviconBranch, IException, IIcon, IconVersion } from '../../../types'
import { createDeviconIconUrl } from '../../../helpers/iconUrl'
import { Tooltip } from '../../../components/Elements/Tooltip'
import { IIconSize, ICON_SIZE_OPTIONS, INIT_ICON_SIZE, CodeBlockOptionTypes } from './types'
import { Dropdown } from '../../../components/Elements/Dropdown'
import { Table } from '../../../components/Elements/Table'
import { TextBar } from '../../../components/Elements/TextBar'
import { copyToClipboard } from '../../../helpers/copyToClipboard'
import IconImage from './iconImage/IconImage'
import ColorPickerDropdown from '../../../components/Elements/Dropdown/ColorPickerDropdown'
import { CodeBlock } from '../../../components/Elements/CodeBlock'
import { createIconCodeBlockText, fetchIconSVG, getCodeBlockOptions } from './helpers/codeBlockContent'
import { ExceptionBar } from '../../../components/Elements/ExceptionBar/ExceptionBar'
import { getSvgExceptions } from '../../../helpers/svgCheck'

interface IconModalProps {
  icon: IIcon
  deviconBranch: DeviconBranch
}

export const IconModal = ({ icon, deviconBranch }: IconModalProps) => {
  const [selectedVersion, setSelectedVersion] = useState<IconVersion>(icon.versions.svg[0])
  const [selectedIconSize, setSelectedIconSize] = useState<IIconSize>(INIT_ICON_SIZE)
  const [selectedColor, setSelectedColor] = useState<string>(icon.color)
  const [codeBlockOptions, setCodeBlockOptions] = useState<CodeBlockOptionTypes[]>([])
  const [selectedOption, setSelectedOption] = useState<CodeBlockOptionTypes>('LINK')
  const [codeText, setCodeText] = useState<string>('')
  const [iconExceptions, setIconExceptions] = useState<IException[]>([])
  const [svgContent, setSvgContent] = useState<string>('')
  const [iconUrl, setIconUrl] = useState<string>('')


  useEffect(() => {
    setCodeText(createIconCodeBlockText(icon, selectedIconSize, iconUrl, svgContent, selectedVersion, selectedColor, selectedOption))
  }, [selectedOption, selectedIconSize, selectedColor])


  useEffect(() => {
    const link = createDeviconIconUrl(icon.name, selectedVersion, deviconBranch)
    setIconUrl(link)

    const tempCodeBlockOptions = getCodeBlockOptions(deviconBranch, icon, selectedVersion)
    setCodeBlockOptions(tempCodeBlockOptions)
    if (!tempCodeBlockOptions.includes(selectedOption)) setSelectedOption(tempCodeBlockOptions[0])
    

    const getInitialData = async () => {
      const tempSvgContent = await fetchIconSVG(link)
      setSvgContent(tempSvgContent);
      setCodeText(createIconCodeBlockText(icon, selectedIconSize, link, tempSvgContent, selectedVersion, selectedColor, selectedOption))
      setIconExceptions(getSvgExceptions(icon, selectedVersion, tempSvgContent));
    }
    getInitialData();

  }, [icon, selectedVersion, deviconBranch])


  return (
    <>
      <Tooltip content='Copy Name' position='bottom' flashMessage='Copied!'>
        <button onClick={() => copyToClipboard(icon.name)} className="button button--icon">
          <p className='font-bold text-2xl'>{icon.name}</p>
          <i className='fa-solid fa-copy text-xl'></i>
        </button>
      </Tooltip>

      <section className='flex flex-col 2xl:flex-row my-4 gap-8'>
        <IconImage icon={icon} iconUrl={iconUrl} selectedIconSize={selectedIconSize} selectedVersion={selectedVersion} selectedColor={selectedColor} extraClasses='flex-1' />
        <div className='flex-1 flex flex-col gap-4'>
          <TextBar icon={{ icon: 'fa-solid fa-folder', copyTitle: 'Copy Tags' }} content={[icon.name]} />
          <div className='flex flex-row gap-4 w-full'>
            <Dropdown
              title='Version'
              isDisabled={false}
              size='full'
              selectedOption={selectedVersion}
              options={icon.versions.svg}
              onChange={(value) => {
                setSelectedVersion(value as IconVersion)
              }}
            />
            <Dropdown
              title='Size'
              isDisabled={false}
              size='full'
              selectedOption={selectedIconSize.name}
              options={ICON_SIZE_OPTIONS.map((option) => option.name)}
              onChange={(value) => {
                setSelectedIconSize(ICON_SIZE_OPTIONS.find((option) => option.name === value)!)
              }}
            />
            <ColorPickerDropdown
              title='Color'
              isDisabled={!icon.versions.font.includes(selectedVersion)}
              size='full'
              defaultColor={icon.color}
              selectedColor={selectedColor}
              onColorChange={(color) => {
                if (color != selectedColor)
                  setSelectedColor(color)
              }}
            />
          </div>
          <Table
            title='Aliases'
            extraClasses='hidden lg:flex'
            data={icon.aliases}
            headers={['Base', 'Alias']}
            keyExtractor={(item, index) => `${item}-${index}`}
            rowRenderer={(item) => [item.base, item.alias]}
            onRowClick={(item) => {
              setSelectedVersion(item.base as IconVersion)
            }}
          />
          <ExceptionBar exceptions={iconExceptions} extraClasses='fade-in' />
        </div>
      </section>
      <CodeBlock
        code={codeText}
        codeBlockOptions={codeBlockOptions}
        selectedOption={selectedOption}
        onClickCodeBlockOption={(codeType) => setSelectedOption(codeType as CodeBlockOptionTypes)}
      />
      <div className='hidden lg:flex flex-row justify-between mt-4'>
        <TextBar title='Alt Names' content={icon.altnames ?? []} />
        <span className='text-sm'>{deviconBranch === 'master' ? DEVICON_VERSION_RELEASE : 'Development Branch'}</span>
      </div>
    </>
  )
}

export default IconModal
