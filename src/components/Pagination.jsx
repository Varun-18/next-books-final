import React, { useEffect, useState } from "react";
import { IconButton, Typography } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";

export default function Pagination({ name, filter }) {
  const [active, setActive] = useState(1);
  const router = useRouter();

  useEffect(() => {
    if (active * 10 !== parseInt(router.query.pageID)) {
      setActive(parseInt(router.query.pageID) / 10);
    }
  }, [router.query]);

  const next = () => {
    if (active === 10) return;

    if (filter) {
      router.push({ query: { name, pageID: (active + 1) * 10, filter } });
    } else {
      router.push({ query: { name, pageID: (active + 1) * 10 } });
    }
    setActive(active + 1);
  };

  const prev = () => {
    if (active - 1 > 0) {
      if (filter) {
        router.push({ query: { name, pageID: (active - 1) * 10, filter } });
      } else {
        router.push({ query: { name, pageID: (active - 1) * 10 } });
      }
      setActive(active - 1);
    } else {
      if (filter) {
        router.push({ query: { name, pageID: 1, filter } });
      } else {
        router.push({ query: { name, pageID: 1 } });
      }
      if (active === 1) return;
    }
  };

  return (
    <div className="flex items-center gap-8">
      <IconButton
        size="sm"
        variant="outlined"
        color="blue-gray"
        onClick={prev}
        disabled={active === 1}
      >
        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />
      </IconButton>
      <Typography color="gray" className="font-normal">
        Page <strong className="text-blue-gray-900">{active}</strong> of{" "}
        <strong className="text-blue-gray-900">10</strong>
      </Typography>
      <IconButton
        size="sm"
        variant="outlined"
        color="blue-gray"
        onClick={next}
        disabled={active === 10}
      >
        <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
      </IconButton>
    </div>
  );
}
