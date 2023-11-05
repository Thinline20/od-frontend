// ---
// import { Image } from "astro:assets";
// import TempCCTVImage from "~/assets/temp-cctv.jpg";

// type Props = {
//   room: string;
// };

// const { room } = Astro.props;
// ---
import TempCCTVImage from "~/assets/temp-cctv.jpg";

type RoomListItemProps = {
  room: string;
};

export default (props: RoomListItemProps) => {
  return (
    <li>
      <form action="/cctv/room" method="get">
        <button
          class="overflow-hidden rounded-lg bg-base-100 shadow-sm outline-neutral/80 ring-[2px] ring-black/5 transition hover:ring-4 hover:ring-neutral/50 hover:ring-offset-2"
          type="submit"
        >
          <figure>
            <img
              src={TempCCTVImage.src}
              alt="cctv room"
              class="aspect-video object-cover"
            />
          </figure>
          <div class="p-6 md:p-8">
            <h3 class="text-xl font-bold uppercase md:text-3xl">
              {props.room}
            </h3>
            <p></p>
          </div>
        </button>
        <input type="text" value={props.room} name="name" class="sr-only" />
      </form>
    </li>
  );
};
