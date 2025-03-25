const ContactInformation = () => {
  return (
    <div className="space-y-5">
      <div>
        <h3 className=" font-medium text-xl">Contact Information</h3>
      </div>
      <div
        style={{ backgroundColor: "var(--bg-hero)" }}
        className="flex flex-row items-center gap-x-6 border border-secondary rounded-[1vw] p-4"
      >
        <div className="space-y-1  w-full">
          <p
            style={{ color: "var(--text)" }}
            className="text-xs tracking-wider"
          >
            Recipient's Name
          </p>
          <h2 className="font-medium text-xl">Sunny Marwah</h2>
          <div className="grid lg:grid-cols-3 sm:grid-cols-3 grid-cols-1 space-y-3 lg:space-y-0 sm:space-y-0">
            <div className="flex flex-col items-start space-y-1 ">
              <h5 className="text-sm font-medium tracking-wider">Address</h5>
              <p style={{ color: "var(--text)" }} className="text-xs leading-5">
                2972 Westheimer Rd. <br />
                Santa Ana, Illinois <br />
                67895
              </p>
            </div>

            <div className="flex flex-col items-start space-y-1">
              <h5 className="text-sm font-medium tracking-wider">Phone</h5>
              <p
                style={{ color: "var(--text)" }}
                className="text-xs tracking-wider"
              >
                (467) 666-6433
              </p>
            </div>

            <div className="flex flex-col items-start space-y-1">
              <h5 className="text-sm font-medium tracking-wider">City</h5>
              <p style={{ color: "var(--text)" }} className="text-xs leading-5">
                London
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ContactInformation;
