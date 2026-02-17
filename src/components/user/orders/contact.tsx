interface Props {
  shipping: any;
}

export default function OrderContact({ shipping }: Props) {
  return (
    <div>
      <h2 className="text-3xl  mb-6 font-dream-orphans text-forest">
        Contact Info
      </h2>

      <div className="border-2 border-forest rounded-lg p-6 grid md:grid-cols-3 gap-6">
        <div>
          <p className="text-sm text-gray-500">Name</p>
          <p className="font-bold">
            {[shipping?.firstName, shipping.lastName].join(" ")}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Email</p>
          <p>
            {shipping?.email ?? (
              <span className="text-muted-foreground uppercase">---</span>
            )}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Phone</p>
          <p>{shipping?.phone}</p>
        </div>
      </div>
    </div>
  );
}
