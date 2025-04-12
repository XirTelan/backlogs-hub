import React, { useState } from "react";
import ButtonBase from "@/shared/ui/ButtonBase";
import LinkBase from "@/shared/ui/LinkBase";
import { FaImages, FaSteam } from "react-icons/fa6";
import { FaExternalLinkAlt } from "react-icons/fa";
import Image from "next/image";
import { MdLocalMovies } from "react-icons/md";
import Modal from "@/shared/ui/Modal/Modal";
import Carousel from "@/entities/backlogItem/ui/Carousel";
import Clip from "@/shared/ui/Clip";
import { SteamApp } from "@/types";
const SteamGameCard = ({
  data,
  children,
}: {
  data: SteamApp;
  children?: React.ReactNode | React.ReactNode[];
}) => {
  const [status, setStatus] = useState("none");

  const showScreenshots = (
    <Modal
      actionOptions={{
        showActions: true,
        align: "top",
        position: "absolute",
        cancelBtn: { text: "Close", clrVariant: "tertiary" },
      }}
      setClose={() => setStatus("none")}
    >
      <Carousel
        data={data.screenshots}
        getKey={(item) => item.id}
        renderActive={(item) => (
          <Image
            src={item.path_full}
            fill
            alt={""}
            style={{ objectFit: "contain" }}
          />
        )}
        renderThumbnail={(item) => (
          <Image
            src={item.path_thumbnail}
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "80%", height: "auto", objectFit: "contain" }}
            alt={""}
          />
        )}
      />
    </Modal>
  );

  const showMovies = (
    <Modal
      actionOptions={{
        showActions: true,
        align: "top",
        position: "absolute",
        cancelBtn: { text: "Close", clrVariant: "tertiary" },
      }}
      setClose={() => setStatus("none")}
    >
      <Carousel
        data={data.movies}
        getKey={(item) => item.id}
        renderActive={(item) => (
          <Clip
            width={"90%"}
            controls
            videoSrc={{
              webm: item.webm.max,
              mp4: item.mp4.max,
            }}
            className="m-auto"
          />
        )}
        renderThumbnail={(item) => (
          <Clip
            width={"320px"}
            videoSrc={{
              webm: item.webm.max,
              mp4: item.mp4.max,
            }}
          />
        )}
      />
    </Modal>
  );

  return (
    <div
      className=""
      style={{
        backgroundImage: `url(${data.background})`,
        backgroundPositionX: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="flex flex-col-reverse gap-2 p-2 md:flex-row">
        <div>
          {data.short_description && (
            <div className="bg-neutral-950/50 p-2">
              {data.short_description}
            </div>
          )}
          <div className="mt-4 flex gap-1">
            {data.screenshots && data.screenshots.length > 0 && (
              <ButtonBase
                variant="tertiary"
                icon={<FaImages />}
                text="Screenshots"
                onClick={() => setStatus("img")}
              />
            )}
            {data.movies && data.movies.length > 0 && (
              <ButtonBase
                variant="tertiary"
                icon={<MdLocalMovies />}
                text="Videos"
                onClick={() => setStatus("vid")}
              />
            )}
          </div>
        </div>
        <div>
          {data.header_image && (
            <div className="flex-1">
              <Image src={data.header_image} width={600} height={0} alt={""} />
            </div>
          )}
          <div className="mt-2 flex  bg-neutral-950/50">
            <LinkBase
              rel="noopener nofollow noreferrer"
              href={`https://store.steampowered.com/app/${data.steam_appid}/`}
            >
              <div className="flex items-center p-2 ">
                <p>Steam Page</p>
                <FaSteam className="ms-4" size={20} />
              </div>
            </LinkBase>
            {data.website && (
              <LinkBase
                rel="noopener nofollow noreferrer"
                href={`${data.website}`}
              >
                <div className="flex items-center p-2 ">
                  <p>Visit the website</p>
                  <FaExternalLinkAlt className="ms-4" size={18} />
                </div>
              </LinkBase>
            )}
          </div>
        </div>
      </div>
      <div className="p-2">
        {data.categories && data.categories.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1">
            {data.categories.map(({ id, description }) => (
              <div key={id} className=" bg-neutral-800 p-1 text-sm ">
                {description}
              </div>
            ))}
          </div>
        )}
      </div>
      {children && <div className="pb-2">{children}</div>}
      {status === "img" && showScreenshots}
      {status === "vid" && showMovies}
    </div>
  );
};

export default SteamGameCard;
