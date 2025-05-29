declare namespace App.Enums {
export type Language = 'en' | 'en_PH';
}
declare namespace Module.Kanban.DTOs {
export type BoardData = {
id: number;
title: string;
};
export type CardData = {
id: number;
column: Module.Kanban.DTOs.ColumnData;
content: string | null;
media_card: string | null;
media_type: string | null;
};
export type ColumnData = {
title: string;
board: Module.Kanban.DTOs.BoardData;
};
}
