function CloseButton({setIsOpen}) {


    function handleClose(){
        setIsOpen(false);
    }

    return (
        <div className="opacity-50 hover:opacity-100" onClick={handleClose}>
            <svg width={36} height={36} fill="none" >
                <path stroke="#fff" strokeWidth={2} d="M8.892 2 2 8.4l9.846 9.846-8.861 8.862 5.907 5.907 8.862-8.861L27.6 34l6.4-6.892-9.846-9.846L33.508 8.4 27.6 2.492l-9.354 8.862L8.892 2z" opacity={0.75} />
            </svg>
        </div>
    );
}

export default CloseButton;