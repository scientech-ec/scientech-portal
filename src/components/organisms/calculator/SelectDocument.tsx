import { XIcon } from "@heroicons/react/outline";
import React, { useEffect, useState } from "react";
import { BSON } from "realm-web";
import { useCalculator } from "../../../hooks/useCalculator";
import { DocumentHeader } from "../../../interfaces/calculatorApp";
import CustomButton from "../../atoms/apps/CustomButton";
import SelectDocumentRow from "../../molecules/calculator/SelectDocumentRow";
import PageSelector from "../../molecules/PageSelector";

/* 
todo: For pagination:

It's necessary to create a wrapper that receives all the fetched data, it would execute the following steps to render the paginated content.

- It has to wrap this table component to render only the values that has to change
- Receives the array of data
- Counts the number of elements in the array
- Calculates how many pages need to organize all the data
- Render the data on each page according to the selected index
- Accomodate the pages buttons for quick access, it includes a next button and a last page button
- Renders conditionally an start button and a previous button, depending to the page index and the available pages
*/

interface Props {
  handleClose: VoidFunction;
}

const SelectDocument: React.FC<Props> = ({ handleClose }) => {
  const { readIndex, open, deleteDocument } = useCalculator();
  const [documents, setDocuments] = useState<DocumentHeader[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const maxItemsPerPage = 5;

  // todo: add pagination function and loading placeholder
  useEffect(() => {
    const loadData = async () => {
      const docs = await readIndex();

      for (let index = 0; index < 20; index++) {
        const element: DocumentHeader = {
          name: `mock-name-${index}`,
          description: `art-${index} Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem vel esse minima odio natus magnam totam quam, consectetur laudantium. Vitae?`,
          articlesQty: index,
          _id: `article-${index}-mock-data`,
        };

        docs.push(element);
      }

      const example = new BSON.ObjectID(docs[0]._id);
      const example1 = new BSON.ObjectID(docs[1]._id);

      console.log(example.getTimestamp(), example.toHexString());
      console.log(example1.toHexString() > example.toHexString());

      const numberOfPages = Math.floor(docs.length / maxItemsPerPage);
      setTotalPages(numberOfPages);
      setDocuments(docs);
    };

    loadData();
  }, []);

  const handleOpen = async (header: DocumentHeader) => {
    await open(header);
    handleClose();
  };

  const handleDelete = async (header: DocumentHeader) => {
    await deleteDocument(header);
    setDocuments((prevState) =>
      prevState.filter((doc) => doc._id !== header._id)
    );
  };

  const handlePagination = (step: number) => {
    if (
      (step < 0 && currentPage > 1) ||
      (step > 0 && currentPage < totalPages)
    ) {
      setCurrentPage((prevState) => prevState + step);
    }
  };

  const paginatedDocuments = (): DocumentHeader[] => {
    /* 
    0..4          (5*1 - 5, 5*1)
    5..9          (5*2 - 5, 5*2)
    10..14
    15..19
    */
    const lastDocumentIndex = maxItemsPerPage * currentPage;
    return documents.slice(lastDocumentIndex - 5, lastDocumentIndex);
  };

  return (
    <>
      <div>
        <PageSelector
          currentPage={currentPage}
          totalPages={totalPages}
          onFirst={() => setCurrentPage(1)}
          onLast={() => setCurrentPage(totalPages)}
          onNext={() => handlePagination(+1)}
          onPrevious={() => handlePagination(-1)}
        />
      </div>
      <div className="grid grid-cols-12 gap-1 border-b px-4 py-6">
        <div className="col-span-2 rounded-md border bg-sky-500 text-center">
          Nombre
        </div>
        <div className="col-span-5 rounded-md border bg-sky-500 text-center">
          Descripción
        </div>
        <div className="col-span-1 rounded-md border bg-sky-500 text-center">
          Artículos
        </div>
        <div className="col-span-2 rounded-md border bg-sky-500 text-center">
          Fecha y Hora
        </div>
        <div className="col-span-2 rounded-md border bg-sky-500 text-center">
          Acción
        </div>

        {paginatedDocuments().map((doc, index) => (
          <SelectDocumentRow
            document={doc}
            index={index}
            handleDelete={handleDelete}
            handleOpen={handleOpen}
            key={index}
          />
        ))}
      </div>
      <div className="flex justify-end gap-2 px-4 py-3">
        <CustomButton
          variant="danger"
          onClick={handleClose}
          icon={<XIcon className="h-5 w-5" />}
        >
          Cancelar
        </CustomButton>
      </div>
    </>
  );
};

export default SelectDocument;
