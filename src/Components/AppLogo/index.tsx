
declare interface AppLogoProps {
    icon: string
}

const AppLogo: React.FC<AppLogoProps> = (props) => {
    return (
        <div className="app-logo">
            <img className="h-8 w-auto sm:h-10" src={props.icon} alt="" />
        </div>
    )
}

export default AppLogo;