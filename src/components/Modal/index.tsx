import { HTMLAttributes } from "react";

type ModalProps = HTMLAttributes<HTMLDivElement> & {
  id: string;
  title?: string;
};

export const Modal: React.FC<ModalProps> = ({
  id,
  title,
  children,
  ...rest
}) => {
  return (
    <div
      className="modal fade"
      id={id}
      tabIndex={-1}
      aria-labelledby={`${id}Label`}
      aria-hidden="true"
      {...rest}
    >
      <div className="modal-dialog modal-fullscreen">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id={`${id}Label`}>
              {title}
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">{children}</div>
        </div>
      </div>
    </div>
  );
};
