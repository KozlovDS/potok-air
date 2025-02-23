import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableRow,
} from "@/components/ui/table";
import React from "react";
import { Download, FileText } from "lucide-react";
import { ProductDocuments } from "@prisma/client";
import { cn } from "@/lib/utils";
import { Title } from "@/components/ui";

interface Props {
  className?: string;
  documents: ProductDocuments[];
}

const ProductDocument: React.FC<Props> = ({ className, documents }) => {
  return (
    <Table className={cn(className, "caption-top")}>
      <TableCaption className="text-left mb-10 mt-4">
        <Title size="h2" text="Документы" />
      </TableCaption>
      <TableBody>
        {documents.map((document) => (
          <TableRow key={document.id}>
            <TableCell className="font-medium flex items-center gap-3 mr-3">
              <FileText />
              {document.name}
            </TableCell>
            <TableCell>
              <a
                href={document.url}
                target="_blank"
                className="hover:text-accent"
                rel="noopener noreferrer"
              >
                {" "}
                {/* Added target and rel */}
                <Download />
              </a>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ProductDocument;
